from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(".").resolve()
OUTPUT_PDF = PROJECT_ROOT / "FULL_PROJECT_CODE.pdf"

EXCLUDED_DIRS = {
    ".git",
    ".next",
    "node_modules",
    "dist",
    "build",
    "out",
    ".vercel",
    ".vscode",
    "__pycache__",
    ".pytest_cache",
    ".cache",
    "coverage",
}

EXCLUDED_FILES = {
    "FULL_PROJECT_CODE.pdf",
    "code_to_pdf.py",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
}

EXCLUDED_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".svg",
    ".mp4", ".mp3", ".wav", ".ogg",
    ".zip", ".rar", ".7z",
    ".pdf",
    ".exe", ".dll",
    ".ttf", ".otf", ".woff", ".woff2",
}

TEXT_EXTENSIONS = {
    ".js", ".jsx", ".ts", ".tsx",
    ".py", ".java", ".c", ".cpp", ".h", ".hpp",
    ".html", ".css", ".scss",
    ".json", ".md", ".txt",
    ".yml", ".yaml",
    ".env.example",
    ".gitignore",
    ".prettierrc",
    ".eslintrc",
    ".babelrc",
    ".config",
}

PAGE_WIDTH, PAGE_HEIGHT = A4

LEFT_MARGIN = 14 * mm
RIGHT_MARGIN = 14 * mm
TOP_MARGIN = 14 * mm
BOTTOM_MARGIN = 14 * mm

FONT_NAME = "Courier"
FONT_SIZE = 7
LINE_HEIGHT = 9

HEADER_FONT_SIZE = 10
TITLE_FONT_SIZE = 16

CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN


def is_probably_text_file(path: Path) -> bool:
    if path.name in EXCLUDED_FILES:
        return False

    if path.suffix.lower() in EXCLUDED_EXTENSIONS:
        return False

    if path.suffix.lower() in TEXT_EXTENSIONS:
        return True

    try:
        with open(path, "rb") as f:
            chunk = f.read(2048)
        if b"\0" in chunk:
            return False
        chunk.decode("utf-8")
        return True
    except Exception:
        return False


def should_skip(path: Path) -> bool:
    parts = set(path.parts)

    for excluded in EXCLUDED_DIRS:
        if excluded in parts:
            return True

    if path.name in EXCLUDED_FILES:
        return True

    if path.name.startswith(".env"):
        return True

    return False


def collect_files():
    files = []

    for path in PROJECT_ROOT.rglob("*"):
        if path.is_file() and not should_skip(path) and is_probably_text_file(path):
            files.append(path)

    return sorted(files, key=lambda p: str(p).lower())


def read_file(path: Path):
    try:
        return path.read_text(encoding="utf-8").splitlines()
    except UnicodeDecodeError:
        try:
            return path.read_text(encoding="latin-1").splitlines()
        except Exception:
            return ["[Could not read this file safely]"]
    except Exception as e:
        return [f"[Error reading file: {e}]"]


def wrap_text(text, max_width, font_name, font_size):
    if text == "":
        return [""]

    result = []
    current = ""

    for char in text:
        test_line = current + char
        if stringWidth(test_line, font_name, font_size) <= max_width:
            current = test_line
        else:
            result.append(current)
            current = char

    if current:
        result.append(current)

    return result


def draw_footer(c, page_number):
    c.setFont("Helvetica", 8)
    c.drawRightString(
        PAGE_WIDTH - RIGHT_MARGIN,
        8 * mm,
        f"Page {page_number}"
    )


def new_page(c, page_number):
    draw_footer(c, page_number)
    c.showPage()
    return page_number + 1


def draw_title_page(c, files):
    c.setFont("Helvetica-Bold", TITLE_FONT_SIZE)
    c.drawString(LEFT_MARGIN, PAGE_HEIGHT - 35 * mm, "Full Project Code Export")

    c.setFont("Helvetica", 10)
    c.drawString(LEFT_MARGIN, PAGE_HEIGHT - 48 * mm, f"Project folder: {PROJECT_ROOT.name}")
    c.drawString(LEFT_MARGIN, PAGE_HEIGHT - 56 * mm, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    c.drawString(LEFT_MARGIN, PAGE_HEIGHT - 64 * mm, f"Total files included: {len(files)}")

    c.setFont("Helvetica-Bold", 11)
    c.drawString(LEFT_MARGIN, PAGE_HEIGHT - 82 * mm, "Note")

    c.setFont("Helvetica", 9)
    notes = [
        "This PDF contains readable source/configuration files from the project.",
        "Large generated folders such as node_modules, .git, dist, build, and .next are skipped.",
        ".env files are skipped to avoid leaking secrets such as API keys and passwords.",
    ]

    y = PAGE_HEIGHT - 92 * mm
    for note in notes:
        c.drawString(LEFT_MARGIN, y, f"- {note}")
        y -= 7 * mm


def draw_index(c, files, page_number):
    page_number = new_page(c, page_number)

    y = PAGE_HEIGHT - TOP_MARGIN
    c.setFont("Helvetica-Bold", 14)
    c.drawString(LEFT_MARGIN, y, "File Index")
    y -= 10 * mm

    c.setFont("Helvetica", 8)

    for i, file_path in enumerate(files, start=1):
        relative_path = str(file_path.relative_to(PROJECT_ROOT))

        wrapped = wrap_text(
            f"{i}. {relative_path}",
            CONTENT_WIDTH,
            "Helvetica",
            8
        )

        for line in wrapped:
            if y < BOTTOM_MARGIN + 12 * mm:
                page_number = new_page(c, page_number)
                y = PAGE_HEIGHT - TOP_MARGIN
                c.setFont("Helvetica", 8)

            c.drawString(LEFT_MARGIN, y, line)
            y -= 5 * mm

    return page_number


def draw_code_file(c, file_path, page_number):
    page_number = new_page(c, page_number)

    relative_path = str(file_path.relative_to(PROJECT_ROOT))
    lines = read_file(file_path)

    y = PAGE_HEIGHT - TOP_MARGIN

    c.setFont("Helvetica-Bold", HEADER_FONT_SIZE)
    header = f"FILE: {relative_path}"
    wrapped_header = wrap_text(header, CONTENT_WIDTH, "Helvetica-Bold", HEADER_FONT_SIZE)

    for line in wrapped_header:
        c.drawString(LEFT_MARGIN, y, line)
        y -= 6 * mm

    y -= 3 * mm

    c.setFont(FONT_NAME, FONT_SIZE)

    line_number_width = 32
    code_width = CONTENT_WIDTH - line_number_width

    for line_no, line in enumerate(lines, start=1):
        numbered_prefix = f"{line_no:>4} | "
        clean_line = line.replace("\t", "    ")

        wrapped_lines = wrap_text(clean_line, code_width, FONT_NAME, FONT_SIZE)

        for wrap_index, wrapped_line in enumerate(wrapped_lines):
            if y < BOTTOM_MARGIN + 10 * mm:
                page_number = new_page(c, page_number)
                y = PAGE_HEIGHT - TOP_MARGIN

                c.setFont("Helvetica-Bold", HEADER_FONT_SIZE)
                c.drawString(LEFT_MARGIN, y, f"FILE CONTINUED: {relative_path}")
                y -= 8 * mm
                c.setFont(FONT_NAME, FONT_SIZE)

            if wrap_index == 0:
                c.drawString(LEFT_MARGIN, y, numbered_prefix)
            else:
                c.drawString(LEFT_MARGIN, y, "     | ")

            c.drawString(LEFT_MARGIN + line_number_width, y, wrapped_line)
            y -= LINE_HEIGHT

    return page_number


def main():
    files = collect_files()

    c = canvas.Canvas(str(OUTPUT_PDF), pagesize=A4)

    page_number = 1
    draw_title_page(c, files)

    page_number = draw_index(c, files, page_number)

    for file_path in files:
        page_number = draw_code_file(c, file_path, page_number)

    draw_footer(c, page_number)
    c.save()

    print("PDF created successfully:")
    print(OUTPUT_PDF)
    print()
    print(f"Total files included: {len(files)}")


if __name__ == "__main__":
    main()

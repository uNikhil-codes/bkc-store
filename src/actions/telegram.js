"use server"

export async function sendOrderAlert(order) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) return

  // Format a beautiful receipt for your phone
  const message = `
🚨 <b>NEW ORDER RECEIVED!</b> 🚨

📦 <b>Product:</b> ${order.product_name}
💳 <b>Payment:</b> ${order.payment_mode === 'prepaid' ? '🟢 ONLINE PREPAID' : '🟠 CASH ON DELIVERY'}
💰 <b>Amount:</b> ₹${order.total_amount}

👤 <b>Customer:</b> ${order.customer_name}
📱 <b>Phone:</b> ${order.customer_phone}
📍 <b>Address:</b>
${order.delivery_address}
${order.city}, ${order.state} - ${order.pincode}

🆔 <b>Order ID:</b> ${order.order_id}
  `

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })
  } catch (error) {
    console.error("Telegram error:", error)
  }
}

export async function sendRequestAlert(request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) return

  const message = `
🔍 <b>NEW PRODUCT REQUEST!</b>

🔎 <b>Looking for:</b>
${request.item_query}

📱 <b>Contact:</b> ${request.contact_info}
  `

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })
  } catch (error) {
    console.error("Telegram error:", error)
  }
}

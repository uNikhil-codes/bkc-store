"use client"
import { useEffect, useState } from 'react'

export default function InstaBrowserWarning() {
  const [isInsta, setIsInsta] = useState(false)

  useEffect(() => {
    // Detects if the user is trapped inside Instagram's internal browser
    if (navigator.userAgent.includes('Instagram')) {
      setIsInsta(true)
    }
  }, [])

  if (!isInsta) return null

  return (
    <div className="bg-primary text-surface text-[11px] text-center py-2 px-4 font-medium tracking-wide">
      For faster checkout, tap <span className="font-bold tracking-widest">•••</span> at the top and select <span className="font-bold underline">Open in Browser</span>
    </div>
  )
}

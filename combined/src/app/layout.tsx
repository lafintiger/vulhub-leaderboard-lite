import './globals.css'

export const metadata = {
  title: 'VulHub Leaderboard',
  description: 'Track your VulHub exploit submissions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}


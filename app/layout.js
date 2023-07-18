import './globals.css'

export const metadata = {
  title: 'Todo List App with Local Storage',
  description: 'Created by Trae Zeeofor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

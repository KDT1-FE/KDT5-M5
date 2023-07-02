import GlobalStyles from './styles/GlobalStyle'
import { AdminHeader } from './components/AdminHeader'
import { AdminNav } from './components/AdminNav'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { biTheme } from './styles/GlobalTheme'
import { AdminContent } from './components/AdminContent'

export default function App() {
  return (
    <>
      <ThemeProvider theme={biTheme}>
        <GlobalStyles />
        <AdminHeader />
        <AdminNav />
        <AdminContent>
          <Outlet />
        </AdminContent>
      </ThemeProvider>
    </>
  )
}

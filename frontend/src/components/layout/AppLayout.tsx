import {
  AccountBalance,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  Dashboard as DashboardIcon,
  Flag,
  Home as HomeIcon,
  Logout,
  Menu as MenuIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const MIN_DRAWER_WIDTH = 180
const MAX_DRAWER_WIDTH = 400
const DEFAULT_DRAWER_WIDTH = 240
const COLLAPSED_DRAWER_WIDTH = 70

interface AppLayoutProps {
  children: ReactNode
}

interface NavItem {
  text: string
  icon: ReactNode
  path: string
}

const navItems: NavItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Transactions', icon: <ReceiptIcon />, path: '/transactions' },
  { text: 'Budget', icon: <AccountBalance />, path: '/budget' },
  { text: 'Goals', icon: <Flag />, path: '/goals' },
]

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerWidth, setDrawerWidth] = useState(DEFAULT_DRAWER_WIDTH)
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    logout()
    navigate('/login')
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    setDrawerWidth(isCollapsed ? DEFAULT_DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH)
  }

  // Resize handlers
  const handleMouseDown = useCallback(() => {
    if (!isCollapsed) {
      setIsResizing(true)
    }
  }, [isCollapsed])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing && !isCollapsed) {
        const newWidth = e.clientX
        if (newWidth >= MIN_DRAWER_WIDTH && newWidth <= MAX_DRAWER_WIDTH) {
          setDrawerWidth(newWidth)
        }
      }
    },
    [isResizing, isCollapsed],
  )

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: isCollapsed ? 'center' : 'space-between', py: 2, px: 2 }}>
        {!isCollapsed && (
          <Typography variant="h6" fontWeight={700} color="primary">
            OrganizedLife
          </Typography>
        )}
        <IconButton
          onClick={handleToggleCollapse}
          size="small"
          sx={{
            ml: isCollapsed ? 0 : 'auto',
            color: 'primary.main',
          }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: isCollapsed ? 1 : 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  minWidth: isCollapsed ? 'auto' : 56,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' }}}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {navItems.find(item => item.path === location.pathname)?.text || 'OrganizedLife'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/')} title="Go to Home" sx={{ mr: 1 }}>
              <HomeIcon />
            </IconButton>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }}}>
              {user?.name}
            </Typography>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText>{user?.email}</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }}}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        {/* Resize Handle - Outside drawer to cover full height */}
        {!isCollapsed && (
          <Box
            onMouseDown={handleMouseDown}
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'fixed',
              left: `${drawerWidth - 2}px`,
              top: 0,
              bottom: 0,
              width: '4px',
              cursor: 'col-resize',
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s, left 0.1s',
              zIndex: theme.zIndex.drawer + 1,
              '&:hover': {
                backgroundColor: 'primary.main',
              },
              '&:active': {
                backgroundColor: 'primary.dark',
              },
            }}
          />
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout

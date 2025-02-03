import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Grade as GradeIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
  roles: Array<'admin' | 'teacher' | 'staff' | 'student'>;
}

const menuItems: MenuItem[] = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard',
    roles: ['admin', 'teacher', 'staff', 'student']
  },
  { 
    text: 'Students', 
    icon: <SchoolIcon />, 
    path: '/students',
    roles: ['admin', 'teacher', 'staff']
  },
  { 
    text: 'My Profile', 
    icon: <PersonIcon />, 
    path: '/profile',
    roles: ['student']
  },
  { 
    text: 'My Grades', 
    icon: <GradeIcon />, 
    path: '/grades',
    roles: ['student']
  },
  { 
    text: 'Class Schedule', 
    icon: <ScheduleIcon />, 
    path: '/schedule',
    roles: ['student', 'teacher']
  },
  { 
    text: 'Assignments', 
    icon: <AssignmentIcon />, 
    path: '/assignments',
    roles: ['admin', 'teacher', 'student']
  },
  { 
    text: 'Events', 
    icon: <EventIcon />, 
    path: '/events',
    roles: ['admin', 'teacher', 'staff', 'student']
  },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    path: '/settings',
    roles: ['admin', 'teacher', 'staff', 'student']
  },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 600) {
      onClose();
    }
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {filteredMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;

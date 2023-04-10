import {
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    CalendarMonth
} from "@mui/icons-material";

import { BsKanban, BsBarChart, BsBoxSeam, BsShield, BsChatLeft } from 'react-icons/bs';
import { AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart, FiSettings } from 'react-icons/fi';
import avatar from '@/assets/profile.jpeg'
import { FaClipboardList } from "react-icons/fa";
export const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Aplications",
        icon: null,
    },
    {
        text: "Calendar",
        icon: <CalendarMonth />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
];

export const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params: { value: string | any[]; }) => params.value.length,
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params: { value: any; }) => `$${Number(params.value).toFixed(2)}`,
    },
];

export const scheduleData = [
    {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        Location: 'Space Center USA',
        StartTime: '2021-01-10T04:00:00.000Z',
        EndTime: '2021-01-10T05:30:00.000Z',
        CategoryColor: '#1aaa55',
    },
    {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        Location: 'Newyork City',
        StartTime: '2021-01-11T06:30:00.000Z',
        EndTime: '2021-01-11T08:30:00.000Z',
        CategoryColor: '#357cd2',
    },
    {
        Id: 3,
        Subject: 'Blue Moon Eclipse',
        Location: 'Space Center USA',
        StartTime: '2021-01-12T04:00:00.000Z',
        EndTime: '2021-01-12T05:30:00.000Z',
        CategoryColor: '#7fa900',
    },
    {
        Id: 4,
        Subject: 'Meteor Showers in 2021',
        Location: 'Space Center USA',
        StartTime: '2021-01-13T07:30:00.000Z',
        EndTime: '2021-01-13T09:00:00.000Z',
        CategoryColor: '#ea7a57',
    },
    {
        Id: 5,
        Subject: 'Milky Way as Melting pot',
        Location: 'Space Center USA',
        StartTime: '2021-01-14T06:30:00.000Z',
        EndTime: '2021-01-14T08:30:00.000Z',
        CategoryColor: '#00bdae',
    },
    {
        Id: 6,
        Subject: 'Mysteries of Bermuda Triangle',
        Location: 'Bermuda',
        StartTime: '2021-01-14T04:00:00.000Z',
        EndTime: '2021-01-14T05:30:00.000Z',
        CategoryColor: '#f57f17',
    },
    {
        Id: 7,
        Subject: 'Glaciers and Snowflakes',
        Location: 'Himalayas',
        StartTime: '2021-01-15T05:30:00.000Z',
        EndTime: '2021-01-15T07:00:00.000Z',
        CategoryColor: '#1aaa55',
    },
    {
        Id: 8,
        Subject: 'Life on Mars',
        Location: 'Space Center USA',
        StartTime: '2021-01-16T03:30:00.000Z',
        EndTime: '2021-01-16T04:30:00.000Z',
        CategoryColor: '#357cd2',
    },
    {
        Id: 9,
        Subject: 'Alien Civilization',
        Location: 'Space Center USA',
        StartTime: '2021-01-18T05:30:00.000Z',
        EndTime: '2021-01-18T07:30:00.000Z',
        CategoryColor: '#7fa900',
    },
    {
        Id: 10,
        Subject: 'Wildlife Galleries',
        Location: 'Africa',
        StartTime: '2021-01-20T05:30:00.000Z',
        EndTime: '2021-01-20T07:30:00.000Z',
        CategoryColor: '#ea7a57',
    },
    {
        Id: 11,
        Subject: 'Best Photography 2021',
        Location: 'London',
        StartTime: '2021-01-21T04:00:00.000Z',
        EndTime: '2021-01-21T05:30:00.000Z',
        CategoryColor: '#00bdae',
    },
    {
        Id: 12,
        Subject: 'Smarter Puppies',
        Location: 'Sweden',
        StartTime: '2021-01-08T04:30:00.000Z',
        EndTime: '2021-01-08T06:00:00.000Z',
        CategoryColor: '#f57f17',
    },
    {
        Id: 13,
        Subject: 'Myths of Andromeda Galaxy',
        Location: 'Space Center USA',
        StartTime: '2021-01-06T05:00:00.000Z',
        EndTime: '2021-01-06T07:00:00.000Z',
        CategoryColor: '#1aaa55',
    },
    {
        Id: 14,
        Subject: 'Aliens vs Humans',
        Location: 'Research Center of USA',
        StartTime: '2021-01-05T04:30:00.000Z',
        EndTime: '2021-01-05T06:00:00.000Z',
        CategoryColor: '#357cd2',
    },
    {
        Id: 15,
        Subject: 'Facts of Humming Birds',
        Location: 'California',
        StartTime: '2021-01-19T04:00:00.000Z',
        EndTime: '2021-01-19T05:30:00.000Z',
        CategoryColor: '#7fa900',
    },
    {
        Id: 16,
        Subject: 'Sky Gazers',
        Location: 'Alaska',
        StartTime: '2021-01-22T05:30:00.000Z',
        EndTime: '2021-01-22T07:30:00.000Z',
        CategoryColor: '#ea7a57',
    },
    {
        Id: 17,
        Subject: 'The Cycle of Seasons',
        Location: 'Research Center of USA',
        StartTime: '2021-01-11T00:00:00.000Z',
        EndTime: '2021-01-11T02:00:00.000Z',
        CategoryColor: '#00bdae',
    },
    {
        Id: 18,
        Subject: 'Space Galaxies and Planets',
        Location: 'Space Center USA',
        StartTime: '2021-01-11T11:30:00.000Z',
        EndTime: '2021-01-11T13:00:00.000Z',
        CategoryColor: '#f57f17',
    },
    {
        Id: 19,
        Subject: 'Lifecycle of Bumblebee',
        Location: 'San Fransisco',
        StartTime: '2021-01-14T00:30:00.000Z',
        EndTime: '2021-01-14T02:00:00.000Z',
        CategoryColor: '#7fa900',
    },
    {
        Id: 20,
        Subject: 'Alien Civilization',
        Location: 'Space Center USA',
        StartTime: '2021-01-14T10:30:00.000Z',
        EndTime: '2021-01-14T12:30:00.000Z',
        CategoryColor: '#ea7a57',
    },
    {
        Id: 21,
        Subject: 'Alien Civilization',
        Location: 'Space Center USA',
        StartTime: '2021-01-10T08:30:00.000Z',
        EndTime: '2021-01-10T10:30:00.000Z',
        CategoryColor: '#ea7a57',
    },
    {
        Id: 22,
        Subject: 'The Cycle of Seasons',
        Location: 'Research Center of USA',
        StartTime: '2021-01-12T09:00:00.000Z',
        EndTime: '2021-01-12T10:30:00.000Z',
        CategoryColor: '#00bdae',
    },
    {
        Id: 23,
        Subject: 'Sky Gazers',
        Location: 'Greenland',
        StartTime: '2021-01-15T09:00:00.000Z',
        EndTime: '2021-01-15T10:30:00.000Z',
        CategoryColor: '#ea7a57',
    },
    {
        Id: 24,
        Subject: 'Facts of Humming Birds',
        Location: 'California',
        StartTime: '2021-01-16T07:00:00.000Z',
        EndTime: '2021-01-16T09:00:00.000Z',
        CategoryColor: '#7fa900',
    },
];
export const userProfileData = [
    {
        icon: <FiSettings />,
        title: 'My Profile',
        desc: 'Account Settings',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
    },
    // {
    //     icon: <AiOutlineMessage />,
    //     title: 'My Inbox',
    //     desc: 'Messages & Emails',
    //     iconColor: '#03C9D7',
    //     iconBg: 'rgb(235, 250, 242)',
    // },
    // {
    //     icon: <BiTask />,
    //     title: 'My Tasks',
    //     desc: 'To-do and Daily Tasks',
    //     iconColor: '#03C9D7',
    //     iconBg: 'rgb(254, 201, 15)',
    // },
    {
        icon: <AiFillHeart />,
        title: 'My Wishlist',
        desc: 'Wish list of my products',
        iconColor: '#03C9D7',
        iconBg: 'rgb(235, 250, 242)',
    },
    {
        icon: <FaClipboardList />,
        title: 'My Orders',
        desc: 'See all Orders',
        iconColor: '#03C9D7',
        iconBg: 'rgb(254, 201, 15)',
    },
];
export const chatData = [
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'Roman Joined the Team!',
        desc: 'Congratulate him',
        time: '9:08 AM',
    },
    {
        image: avatar,
        message: 'New message received',
        desc: 'Salma sent you new message',
        time: '11:56 AM',
    },
    {
        image: avatar,
        message: 'New Payment received',
        desc: 'Check your earnings',
        time: '4:39 AM',
    },
    {
        image: avatar,
        message: 'Jolly completed tasks',
        desc: 'Assign her new tasks',
        time: '1:12 AM',
    },
];

export const cartData = [
    {
        image: avatar,
        name: 'butterscotch ice-cream',
        category: 'Milk product',
        price: '$250',
    },
    {
        image: avatar,
        name: 'butterscotch ice-cream',
        category: 'Milk product',
        price: '$250',
    },
    {
        image: avatar,
        name: 'butterscotch ice-cream',
        category: 'Milk product',
        price: '$250',
    },
    {
        image: avatar,
        name: 'butterscotch ice-cream',
        category: 'Milk product',
        price: '$250',
    },
    {
        image: avatar,
        name: 'Supreme fresh tomato',
        category: 'Vegetable Item',
        price: '$450',
    },
    {
        image: avatar,
        name: 'Red color candy',
        category: 'Food Item',
        price: '$190',
    },
];

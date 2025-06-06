import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import AddTaskScreen from "../Screens/AddTaskScreen";
import TaskListScreen from "../Screens/TaskListScreen";
import MyPageScreen from "../Screens/MyPageScreen";

const tabConfig = [
  {
    name: "Home",
    title: "Home",
    component: HomeScreen,
    focuedIcon: "home",
    unfocusedIcon: "home-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "SearchTask",
    title: "Search",
    component: SearchScreen,
    focuedIcon: "search",
    unfocusedIcon: "search-outline",
    iconComponent: Ionicons,
  },
  {
    name: "Add",
    title: "Add Task",
    component: AddTaskScreen,
    focuedIcon: "plus-square",
    unfocusedIcon: "plus-square-o",
    iconComponent: FontAwesome,
  },
  {
    name: "TaskList",
    title: "Tasks",
    component: TaskListScreen,
    focuedIcon: "list-sharp",
    unfocusedIcon: "list-outline",
    iconComponent: Ionicons,
  },
  {
    name: "Profile",
    title: "Profile",
    component: MyPageScreen,
    focuedIcon: "user",
    unfocusedIcon: "user-o",
    iconComponent: FontAwesome,
  },
];

export default tabConfig;

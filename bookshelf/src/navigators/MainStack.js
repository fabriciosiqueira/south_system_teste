import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//import StarterIntro from '../screens/StarterIntro';
import Search from '../screens/Search';



const MainStack = createStackNavigator({

    Search

    
}, {
    initialRouteName:'Search',
    defaultNavigationOptions:{
        headerShown:false
    }
});

export default createAppContainer(MainStack);
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Pages = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Pages.Navigator
        headerBackTitleVisible="false"
        headerTitleAlign="center"
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
        }}>
        <Pages.Screen
          name="Main"
          options={{title: 'Usuários'}}
          component={Main}
        />
        <Pages.Screen
          name="User"
          options={({route}) => ({title: route.params.data.name})}
          component={User}
        />
      </Pages.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

import {Stack } from 'expo-router';
import { StackScreen } from 'expo-router/build/layouts/stack-utils';
export default function Navigation() {
    return (
       <Stack>
        <StackScreen name="(tabs)" options= {{headerShown:false}} />
        {/*<Stack.Screen name="palabra" options={{ title: 'Detalle'  }} />
        <Stack.Screen name= "index" options= {{headerShown:false}}/> 
        <Stack.Screen name="palabra" options={{ title: 'Detalle'  }} />
        <Stack.Screen name="game" options={{ title: 'Juego' }} /> */}
        </Stack>  
    )
}
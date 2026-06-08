import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        {null}
      </NavigationContainer>
      <StatusBar style="auto" />
    </FavoritesProvider>
  );
}

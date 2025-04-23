// En app/index.tsx
import { ScrollView } from 'react-native';
import BodyBento from '../components/BodyBento';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomeScreen() {
  return (
    <ScrollView>
      <Header />
      <BodyBento />
      <Footer />
    </ScrollView>
  );
}
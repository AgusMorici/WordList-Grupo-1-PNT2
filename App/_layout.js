import { AuthProvider } from '../hooks/useAuth';
import Navigation from './navigation';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
}

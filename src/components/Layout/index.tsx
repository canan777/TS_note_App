import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Note } from '../../types';

interface LayoutProps {
  notes: Note[];
}

const Layout = ({ notes }: LayoutProps) => {
  //1) url'den idyi al
  const { id } = useParams();

  //2) urlden alınan id ile eşleşn note'u bul
  const found = notes.find((n) => n.id == id);

  //3) note' bulunamadıysa kullanıcyı anasayfaya yönlendir
  if (!found) return <Navigate to={'/'} replace />;

  //4) alt route'u ekrana bas bulunan note'u alt route'a göre
  return <Outlet context={found} />;
};

export default Layout;
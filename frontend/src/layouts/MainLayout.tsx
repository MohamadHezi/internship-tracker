import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
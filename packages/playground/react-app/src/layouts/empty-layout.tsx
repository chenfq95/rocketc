import '@rocketc/react/tailwind.css';
import '@rocketc/react/style.css';

export default function EmptyLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
    </>
  );
}
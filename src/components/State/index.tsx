import { Center, ErrorCenter, Spinner } from './styles';

export function Loading({ label = 'Carregando...' }: { label?: string }) {
  return (
    <Center role="status">
      <Spinner />
      <span>{label}</span>
    </Center>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <Center>{message}</Center>;
}

export function ErrorState({ message }: { message: string }) {
  return <ErrorCenter role="alert">{message}</ErrorCenter>;
}

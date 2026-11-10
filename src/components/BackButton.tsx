import { useLocation, useNavigate } from 'react-router';
import { ChevronLeftIcon } from './Icons';
import { ActionButton } from './ui';

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // "default" indica que não há histórico interno para voltar
  const handleClick = () => (location.key === 'default' ? navigate('/') : navigate(-1));

  return (
    <ActionButton type="button" onClick={handleClick}>
      <ChevronLeftIcon /> Voltar
    </ActionButton>
  );
}

import { Slot as S } from '@radix-ui/react-slot';

export type SlotProps = React.ComponentProps<typeof S>;

export const Slot = ({ children, ...props }: SlotProps) => {
  return <S {...props}>{children}</S>;
};

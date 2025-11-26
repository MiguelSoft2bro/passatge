// Componente para transiciones gradientes entre secciones
interface GradientTransitionProps {
  fromColor: string;
  toColor: string;
  height?: number;
  direction?: 'to-bottom' | 'to-top';
}

export default function GradientTransition({ 
  fromColor, 
  toColor, 
  height = 80, 
  direction = 'to-bottom' 
}: GradientTransitionProps) {
  return (
    <div 
      className="w-full"
      style={{
        height: `${height}px`,
        background: `linear-gradient(${direction}, ${fromColor}, ${toColor})`
      }}
    />
  );
}

type Props = {
  quote: string;
};
export function Comunication({ quote }: Props) {
  return (
    <div className="comunications">
      <p className="comunications__text display-1">{quote}</p>
      <img
        className="comunications__picture"
        src="img/no-one.jpg"
        alt="Nombre y familia del que habla"
      />
    </div>
  );
}

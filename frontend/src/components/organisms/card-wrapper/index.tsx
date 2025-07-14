import { Card } from '@/components/molecules/card'

export default function CardWrapper() {
  const cards = [1,2,3]
  return (
    <div>
      {cards.map((card) => (
        <Card key={card} />
      ))}
    </div>
  )
}

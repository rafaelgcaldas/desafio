import type { RelatedCharacter } from '@/types/types'
import { Button } from '../ui/button'
import { Link } from 'lucide-react'

type RelatedItemsProps = {
  relatedItemsList: RelatedCharacter[]
  onNavigateToCharacter: (url: string) => void
}

export function RelatedItems({
  relatedItemsList,
  onNavigateToCharacter,
}: RelatedItemsProps) {
  return (
    <div className="mx-auto my-16 max-w-[1200px] p-4">
      <h2 className="mb-8 text-3xl font-bold">Personagens relacionados</h2>
      <div className="flex flex-wrap gap-4">
        {relatedItemsList.map((character, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onNavigateToCharacter(character.resourceURI)}
          >
            <Link className="size-12" />
            <span>{character.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

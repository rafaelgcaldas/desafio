import { searchCharacters } from '@/api/searchCharacters'
import type { Characters } from '@/types/types'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<Characters[] | undefined>(undefined)

  const debounced = useDebouncedCallback(
    async (value) => {
      if (value.trim() === '') {
        setResult(undefined)
        return
      }

      const response = await searchCharacters({ searchTerm: value.trim() })
      setResult(response)
    },
    500 // delay in ms
  )

  useEffect(() => {
    if (!open) {
      setResult(undefined)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Search className="size-5" aria-label="Open search" />
      </DialogTrigger>
      <DialogContent className="p-4" aria-describedby={undefined}>
        <DialogHeader className="only">
          <DialogTitle>Pesquisar personagens</DialogTitle>
        </DialogHeader>
        <form className="flex flex-1 items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-800 focus:border-blue-100 focus:ring-blue-500"
              placeholder="Pesquise personagens pelo nome..."
              onChange={(e) => debounced(e.target.value)}
            />
          </div>
        </form>

        {result && (
          <div className="max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white text-gray-900">
            {result.length > 0 ? (
              <>
                {result.map((character) => (
                  <Link
                    className="relative inline-flex w-full items-center border-b border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                    to={`/details/${character.id}`}
                    key={character.id}
                    onClick={() => setOpen(false)}
                  >
                    {character.name}
                  </Link>
                ))}
              </>
            ) : (
              <p className="p-4">Nenhum personagem foi encontrado.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

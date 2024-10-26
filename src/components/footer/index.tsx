import marvelLogo from '@/assets/marvel-logo.svg'

export function Footer() {
  return (
    <div className="bg-foreground p-4">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4">
        <img src={marvelLogo} alt="Marvel logo" />

        <p className="text-sm font-semibold text-white md:text-base">
          Data provided by Marvel. © 2024 MARVEL
        </p>
      </div>
    </div>
  )
}

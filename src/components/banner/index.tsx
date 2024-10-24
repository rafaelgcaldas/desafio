import marvelLogoXl from '@/assets/marvel-logo-xl.svg'

type BannerProps = {
  title: string
  hasLogo?: boolean
}

export function Banner({ title, hasLogo = false }: BannerProps) {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center gap-6 bg-banner-marvel bg-bottom p-4">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      {hasLogo && <img src={marvelLogoXl} alt="Marvel logo" />}
    </div>
  )
}

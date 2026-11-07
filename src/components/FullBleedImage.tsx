type FullBleedImageProps = {
  src: string
  /** Prioridade alta para imagens acima da dobra (ex.: hero). */
  priority?: boolean
  className?: string
}

/** Imagem de fundo em tela cheia sem o carregamento progressivo típico de `background-image`. */
export default function FullBleedImage({
  src,
  priority = false,
  className = '',
}: FullBleedImageProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-primary ${className}`}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        width={1920}
        height={1080}
        className="size-full object-cover object-center"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        draggable={false}
      />
    </div>
  )
}

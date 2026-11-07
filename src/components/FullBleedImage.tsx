type FullBleedImageProps = {
  src: string
  /** Prioridade alta para imagens acima da dobra (ex.: hero). */
  priority?: boolean
  className?: string
  /**
   * Fundo fixo na viewport em telas md+ (efeito parallax na rolagem).
   * Em mobile usa rolagem normal por compatibilidade.
   */
  fixedOnDesktop?: boolean
}

/** Imagem de fundo em tela cheia sem o carregamento progressivo típico de `background-image`. */
export default function FullBleedImage({
  src,
  priority = false,
  className = '',
  fixedOnDesktop = false,
}: FullBleedImageProps) {
  if (fixedOnDesktop) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-0 bg-primary bg-cover bg-center bg-no-repeat max-md:bg-scroll md:bg-fixed ${className}`}
        style={{ backgroundImage: `url(${src})` }}
        role="presentation"
        aria-hidden
      />
    )
  }

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

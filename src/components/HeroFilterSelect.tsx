import { useEffect, useId, useRef } from 'react'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

export type FilterOption = {
  value: string
  label: string
}

type HeroFilterSelectProps = {
  label: string
  placeholder: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HeroFilterSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  open,
  onOpenChange,
}: HeroFilterSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selected = options.find((o) => o.value === value)
  const display = selected?.label ?? placeholder

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(e.target as Node)) onOpenChange(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  return (
    <div ref={rootRef} className="relative min-w-0 lg:flex-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => onOpenChange(!open)}
        className={`group flex w-full min-w-0 flex-col items-start gap-0.5 px-4 py-3.5 text-left transition lg:px-5 lg:py-4 ${
          open ? 'bg-surface/80' : 'hover:bg-neutral-50/80'
        }`}
      >
        <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase sm:text-xs">
          {label}
        </span>
        <span className="flex w-full items-center justify-between gap-2 text-sm font-medium text-primary sm:text-base">
          <span className={`truncate ${!selected ? 'text-neutral-400 font-normal' : ''}`}>
            {display}
          </span>
          <FiChevronDown
            className={`size-4 shrink-0 text-neutral-400 transition duration-200 group-hover:text-primary ${
              open ? 'rotate-180 text-accent' : ''
            }`}
            aria-hidden
          />
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute top-[calc(100%-4px)] z-50 max-h-60 w-[min(100%,18rem)] overflow-y-auto rounded-xl border border-neutral-200/90 bg-white p-1.5 shadow-xl shadow-primary/15 ring-1 ring-black/5 sm:w-full"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li key={option.value || '__any'} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value)
                    onOpenChange(false)
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? 'bg-primary/8 font-semibold text-primary'
                      : 'text-neutral-700 hover:bg-surface'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <FiCheck className="size-4 shrink-0 text-accent" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

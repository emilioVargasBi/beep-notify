// tests/beep.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Beep from "../index";

beforeEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('Beep.toast()', () => {

  it('crea un toast con el mensaje indicado', () => {
    Beep.toast({ message: "correcto" });

    const el = document.querySelector('.beep-notification');

    expect(el).not.toBeNull();
    expect(el?.textContent).toContain('correcto');
  });

  it('usa el mensaje por defecto si no se pasa ninguno', () => {
    Beep.toast({});

    const el = document.querySelector('.beep-notification');

    expect(el).not.toBeNull();
    expect(el?.textContent?.length).toBeGreaterThan(0);
  });

  it('crea un contenedor si no existe', () => {
    expect(document.querySelector('.beep-container')).toBeNull();

    Beep.toast({ message: 'hola' });

    const container = document.querySelector('.beep-container');
    expect(container).not.toBeNull();
  });

  it('aplica la clase de tipo correctamente', () => {
    Beep.toast({ message: 'ok', type: 'success' });

    const el = document.querySelector('.beep-notification');

    expect(el?.classList.contains('success')).toBe(true);
  });

  it('permite crear múltiples toasts', () => {
    Beep.toast({ message: 'uno' });
    Beep.toast({ message: 'dos' });

    const toasts = document.querySelectorAll('.beep-notification');

    expect(toasts.length).toBe(2);
  });

  it('elimina el toast después del tiempo indicado', () => {
  vi.useFakeTimers();

  Beep.toast({ message: 'bye', duration: 2000 });

  let el = document.querySelector('.beep-notification');
  expect(el).not.toBeNull();

  // avanzar duración + animación
  vi.advanceTimersByTime(2300);

  el = document.querySelector('.beep-notification');
  expect(el).toBeNull();
});

  it('no rompe si se llama sin opciones', () => {
    expect(() => Beep.toast({})).not.toThrow();
  });

});
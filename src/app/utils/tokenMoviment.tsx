// https://preview.redd.it/0e630cf3sqd91.png?width=1080&crop=smart&auto=webp&s=f6da303d41cad8c970ff9d31c8f17028d31bf785

let isDragging: boolean  = false;  // Para controlar se o movimento está ativo
let elementToken: HTMLElement | null = null;

// to-do - precisa fazer com que ao clica rno elemento ele suba no z-index;para ficar acima de outros elmentos criados.

export default function tokenMovement(e: React.MouseEvent<HTMLElement>): void {
    const elementId = e.currentTarget.id;
    elementToken = document.getElementById(elementId);

    if (elementToken) {
        isDragging = true;

        // Adiciona os eventos de mousemove e mouseup
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);

        // Previne o comportamento padrão para evitar seleção de texto ou outros efeitos
        e.preventDefault();
    }
}

function mouseMove(e: MouseEvent) {
    if (!isDragging) return;
    
    if (!elementToken) return;

    // Pegando as dimensões do elemento
    const rect = elementToken.getBoundingClientRect();
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    // Centralizando a div no mouse, 
    // o pageX e o pageY são as possições do mouse na pagina inteira, o e.movementX e e.movementX são arpa que lado foi o mouse +1 -1
    elementToken.style.left = `${e.pageX - (elementWidth / 2)}px`;
    elementToken.style.top = `${e.pageY  - (elementHeight / 2)}px`;
}

function mouseUp() {
    // Quando o mouse é solto, desativa o movimento
    isDragging = false;
    // Remove os ouvintes de evento para não continuar movendo após o mouseup
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}
 
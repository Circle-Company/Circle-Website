// Valores base pensados para layout mobile (podem ser ajustados se necessário)
// Para web, tentamos usar o tamanho real da janela quando disponível.
function getWindowDimensions(): { width: number; height: number } {
    if (typeof window === "undefined") {
        // Fallback para SSR / ambiente sem window
        return {
            width: 375,
            height: 812,
        }
    }

    return {
        // usamos 'any' aqui para evitar conflito com o nome do objeto `window` exportado abaixo
        // e manter compatibilidade com TypeScript em ambiente web.
        width: (window as any).innerWidth as number,
        height: (window as any).innerHeight as number,
    }
}

const { width: WindowWidth, height: WindowHeight } = getWindowDimensions()

const borderRadius = {
    10: 10,
    20: 20,
    28: 28,
    40: 40,
    72: 72,
}

const paddings = {
    10: 10,
    15: 15,
    20: 20,
    26: 26,
    28: 28,
    40: 40,
    72: 72,
}

const borders = {
    0.5: 0.5,
    1: 1,
    2: 2,
    4: 4,
    5: 5,
}

const margins = {
    5: 5,
    10: 10,
    15: 15,
    20: 20,
    26: 26,
    28: 28,
    40: 40,
    72: 72,
}

const spaces = {
    10: 10,
    15: 15,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    70: 70,
    80: 80,
    100: 100,
    150: 150,
    200: 200,
    250: 250,
    300: 300,
}

const viewport = {
    width: WindowWidth,
    height: WindowHeight,
}

const header = {
    height: 80,
    width: WindowWidth,
}

const footer = {
    height: 80,
    width: WindowWidth,
    padding: paddings[10] / 2,
}

const screen = {
    width: viewport.width,
    height: viewport.height - header.height - footer.height,
    overflow: "hidden",
    padding: paddings[10] / 2,
}

const button = {
    width: WindowWidth - 60,
    height: 80,
    borderRadius: 40,
    paddingHorizontal: 28,
    marginHorizontal: 33,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
}

const input = {
    width: screen.width - screen.padding * 2,
    height: 56,
    paddingHorizontal: paddings[15],
    paddingVertical: paddings[10] / 2,
    borderRadius: borderRadius[10],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
}

const icon = {
    12: {
        width: 12,
        height: 12,
        padding: 1,
    },
    17: {
        width: 17,
        height: 17,
        padding: 2,
    },
    24: {
        width: 24,
        height: 24,
        padding: 10,
    },
    32: {
        width: 32,
        height: 32,
        padding: 15,
    },
}

const isSmallDevice = WindowWidth < 375

export default {
    borderRadius,
    paddings,
    borders,
    margins,
    spaces,
    // objeto com dimensões da viewport (largura/altura atuais)
    window: viewport,
    // aliases no plural para retrocompatibilidade com o código existente
    headers: header,
    header,
    footer,
    screens: screen,
    screen,
    buttons: button,
    button,
    inputs: input,
    input,
    icons: icon,
    icon,
    isSmallDevice,
}

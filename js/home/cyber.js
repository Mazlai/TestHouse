class CyberEasterEgg {
    constructor() {
        this.frames = [
            `
    ' : | | | |:  ||  :     '  :  |  |+|: | : : :|   .        '              .     .    *     .     .    .      .   .       .   .    +     .   
            ' : | :|  ||  |:  :    '  |  | :| : | : |:   |  .                    :     .          .          .    +     .          .          .
                .' ':  ||  |:  |  '       ' || | : | |: : |   .  '           .   :.  .     .    .      .   .      . .  .   .           .    .       .        .
                        ''  ||  |  ' |   *    ' : | | :| |*|  :   :               :|    .   .      .    *     .     .    .      .   .   .    ;    .   .      .  
                *    *       '  |  : :  |  .      ' ' :| | :| . : :         *   :.||        .      .    .     .     .    .      .   .    - --+- -  .  -+-
                    .'            | |  |  : .:|       ' | || | : |: |          | ||      .           .           .           .           .  !       +  .
            '          .         + '  |  :  .: .         '| | : :| :    .   |:| ||           .            .   . *    .   .    .            .   . *    .   .
                .                 .    ' *|  || :       '    | | :| | :      |:| |       .         _  .          .          .    +     .          .          . 
        .                .          .        || |.: *          | || : :     :|||           .(_)          .            .            .       :
                .            .   . *    .   .  ' |||.  +        + '| |||  .  ||'  . .      .   .      .    .     .     .    .      .   .      . .  .  -+-       
            .             *              .     +:'|!             . ||||  :.||'    .         .           .   .        .           .          /         :  .
        +                      .                ..!|*          . | :'||+ |||'         . .        .  .      /.   .      .    .     .     .  / .      . ' .
            .                         +      : |||'        .| :| | | |.| ||'     .        .  +       .    /     .          .          .   /      .
            *     +   '               +  :|| |'     :.+. || || | |:'|| '               .            .  /         .            .        *   .         .     .
                                    .      .||' .    ..|| | |: '' '| | |'  +            .   .      .    *     .     .    .      .   .       .  .
        .       +++                      ||        !|!: '       :| |    .'              .           .           .           .           .         +  .
                    +         .      .    | .      '|||.:      .||    .      .            .  .       .   .      .    .     .     .    .      .   .
                '                           '|.   .  ':|||   + ||'     '            +      .          ___/\_._/~~\_...__/\__.._._/~\        .         .   .
        __    +      *                         ''       ''|.    ':                   .          _.--'                              '--./\          .   .
        "'  '---"""----....____,..^---'^''----.,.___          '.    '.  .    ____,.,-       /~~\/~\                                         '-/~\_            .
            ___,--'""'---"'   ^  ^ ^        ^       """'---,..___ __,..---""'           .-'                                                      '-/\_
        --"'                                 ^                         ''--..,___ ___/\.-'                                                          __/~\/\-.__
            `,
            `
   🛸 CHAMBRE OPERATIONNELLE INTERSTELLAIRE 🌌

    PROTOCOLE DE NAVIGATION SPATIALE ACTIVE
    SYSTEME DE CONNEXION: EN LIGNE
            `,
            `
   ⭐ CONFIGURATION DE L'ENVIRONNEMENT COSMIQUE ⭐

    RELAIS SATELLITE: CONNECTE
    TRAJECTOIRE DE TRANSMISSION: VERROUILLE
    FREQUENCE DE COMMUNICATION: ETABLIE
            `,
            `
   🔒 PROTOCOLE DE SECURITE SPATIAL ACTIVE 🚨

    ENTREZ LE CODE D'ACCES INTERSTELLAIRE:
            `
        ];
        
        this.terminalElement = null;
    }

    createTerminalElement() {
        this.terminalElement = document.createElement('div');
        this.terminalElement.style.position = 'fixed';
        this.terminalElement.style.top = '0';
        this.terminalElement.style.left = '0';
        this.terminalElement.style.width = '100%';
        this.terminalElement.style.height = '100%';
        this.terminalElement.style.backgroundColor = 'black';
        this.terminalElement.style.color = '#00ff88';  // Un vert bleuté pour évoquer l'espace
        this.terminalElement.style.fontFamily = 'monospace';
        this.terminalElement.style.padding = '20px';
        this.terminalElement.style.zIndex = '9999';
        this.terminalElement.style.fontSize = '14px';  // Légèrement réduit pour l'ASCII art complexe
        this.terminalElement.style.whiteSpace = 'pre-wrap';
        this.terminalElement.style.overflow = 'auto';
        this.terminalElement.style.textShadow = '0 0 5px #00ff88';  // Effet lumineux
        
        document.body.appendChild(this.terminalElement);
    }

    createInputField() {
        const inputContainer = document.createElement('div');

        const prompt = document.createElement('span');
        prompt.textContent = '🛰️ > ';
        prompt.style.color = '#00ff88';

        const input = document.createElement('input');
        input.type = 'text';
        input.style.backgroundColor = 'black';
        input.style.color = '#00ff88';
        input.style.border = 'none';
        input.style.borderBottom = '1px solid #00ff88';
        input.style.width = '200px';
        input.style.textShadow = '0 0 5px #00ff88';

        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.validateSecretCode(input.value);
            }
        });

        inputContainer.appendChild(prompt);
        inputContainer.appendChild(input);
        this.terminalElement.appendChild(inputContainer);

        // Focus automatique sur l'input
        input.focus();
    }

    async startCyberSequence() {
        this.createTerminalElement();
        
        for (const frame of this.frames) {
            await this.typeWriter(frame + '\n');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Ajout du champ de saisie
        this.createInputField();
    }

    typeWriter(text, speed = 10) {
        return new Promise((resolve) => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    this.terminalElement.textContent += text[i];
                    i++;
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, speed);
        });
    }

    validateSecretCode(code) {
        if (code.toLowerCase() === 'pos reist') {
            window.location.href = 'cyber.html';
        } else {
            this.terminalElement.textContent += '\n🚨 TRANSMISSION INTERCEPTEE. ACCES REFUSE. 🛡️\n';
            window.location.reload();   
        }
    }
}

// Initialisation de l'easter egg
document.addEventListener('DOMContentLoaded', () => {
    const cyberEgg = new CyberEasterEgg();
    
    // Déclenchement sur le H du titre
    const hElement = document.querySelector('.site-title .hover-h');
    hElement.addEventListener('click', () => {
        cyberEgg.startCyberSequence();
    });
});
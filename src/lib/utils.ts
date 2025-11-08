import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    // Bengali character mapping
    const bn = 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহৎংঃঁ'
    const en = 'aaiiuurieeoooukkhogghonococchojojhonotothododhono-popho-bobhomo-yorolosossosohot-n-n'
    
    let slug = text.toString().toLowerCase()
        // Replace Bengali characters
        .split('').map(char => {
            const index = bn.indexOf(char);
            if (index !== -1) {
                // This is a simplified transliteration, may need adjustment
                if (en.substring(index * 2, index * 2 + 2) === 'o-') return 'o'
                if (en.substring(index * 2, index * 2 + 2) === 'ho') return 'h'
                 if (char === 'া') return 'a';
                 if (char === 'ি') return 'i';
                 if (char === 'ী') return 'i';
                 if (char === 'ু') return 'u';
                 if (char === 'ূ') return 'u';
                 if (char === 'ৃ') return 'ri';
                 if (char === 'ে') return 'e';
                 if (char === 'ৈ') return 'oi';
                 if (char === 'ো') return 'o';
                 if (char === 'ৌ') return 'ou';
                 if (char === '্') return '';

                return en[index] || '';
            }
            return char;
        }).join('')
        .replace(/শিরোনাম/g, 'siroman')
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphen
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text

    return slug || "untitled";
}

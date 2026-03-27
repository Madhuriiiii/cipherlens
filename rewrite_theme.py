import os
import glob

replacements = {
    # Custom cyber theme mappings
    'bg-cyber-dark': 'bg-slate-50',
    'bg-cyber-panel/50': 'bg-white',
    'bg-cyber-dark/40': 'bg-white',
    'text-cyber-green': 'text-green-600',
    'text-cyber-red': 'text-red-600',
    'text-cyber-orange': 'text-orange-500',
    'text-cyber-yellow': 'text-yellow-500',
    'text-cyber-blue': 'text-blue-600',
    'bg-cyber-green': 'bg-green-600',
    'bg-cyber-red': 'bg-red-600',
    'bg-cyber-orange': 'bg-orange-500',
    'bg-cyber-blue': 'bg-blue-600',
    'bg-cyber-blue/20': 'bg-blue-100',
    'border-cyber-border': 'border-slate-200',
    'border-cyber-blue': 'border-blue-600',
    'border-cyber-red': 'border-red-600',
    
    # Structural mappings
    'glass-panel': 'bg-white rounded-xl shadow-sm border border-slate-200',
    'backdrop-blur-2xl': '',
    'backdrop-blur-lg': '',
    'backdrop-blur': '',
    
    # Zinc to Light Slate
    'text-zinc-100': 'text-slate-900',
    'text-zinc-200': 'text-slate-800',
    'text-zinc-300': 'text-slate-600',
    'text-zinc-400': 'text-slate-500',
    'text-zinc-500': 'text-slate-500',
    'bg-zinc-900/50': 'bg-white',
    'bg-zinc-800': 'bg-slate-100',
    'bg-zinc-900': 'bg-slate-100',
    'border-zinc-700': 'border-slate-200',
    
    # Specific component styles
    'text-white': 'text-white', # Keep this for buttons
    'bg-indigo-500/30': 'bg-blue-200',
    'text-indigo-400': 'text-blue-600',
    'bg-emerald-500/10': 'bg-green-50',
    'border-emerald-500/20': 'border-green-200',
    'text-emerald-400': 'text-green-600',
    'text-emerald-100/80': 'text-green-800',
    'text-emerald-500/70': 'text-green-600',
    
    'bg-slate-800/50': 'bg-slate-50',
    'bg-slate-800/30': 'bg-slate-50',
    'border-slate-700/50': 'border-slate-200',
    'text-slate-100': 'text-slate-900',
    'text-slate-300': 'text-slate-700',
    
    # Extra fixes
    'bg-slate-950/80': 'bg-slate-900/60',
    'bg-slate-800': 'bg-slate-100 hover:bg-slate-200',
    'bg-slate-700': 'bg-slate-200',
    'color-cyber-blue': 'blue-600',
    'color-cyber-border': 'slate-200',
}

def rewrite_files():
    files = glob.glob('src/**/*.tsx', recursive=True)
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == '__main__':
    rewrite_files()
    print("Rewritten successfully")

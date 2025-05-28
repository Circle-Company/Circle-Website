
export function ActionButton({text}: { text: string }) {
    return (
        <button className="bg-action text-white rounded-full py-2 px-5 text-base font-sf-pro font-medium hover:bg-actionHover transition-colors">
        {text}
      </button>
        
    )
}
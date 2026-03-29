

const PostsButton = () => {
    return (
        <div className="flex justify-end">
            <button className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5
    rounded-lg border border-neutral-300 bg-transparent text-sm font-medium
    text-neutral-900 transition-all duration-150 outline-none
    hover:bg-amber-400 hover:text-amber-950 hover:border-amber-400 hover:scale-105
    active:scale-97 focus-visible:ring-2 focus-visible:ring-amber-400/40
    dark:border-neutral-600 mt-6 mb-4 mr-8
    dark:hover:bg-amber-400 dark:hover:text-amber-950 dark:hover:border-amber-400
    disabled:opacity-45 disabled:pointer-events-none dark:text-neutral-100">
                Posts
            </button>
        </div>
    )
    }

export default PostsButton

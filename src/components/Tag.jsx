const Tag =({ children }) => {
    return (
        <div className="tag text-xs leading-5 font-medium text-indigo-600 bg-indigo-400/10 rounded-full py-1 px-3 flex items-center hover:bg-indigo-400/20 w-fit mx-auto mb-4">
                {children}
        </div>
   ) ;
};

export default Tag;
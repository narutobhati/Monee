export function Card({

  title,
  children,
  
}: {
  
  title: string;
  children: React.ReactNode;
  
}): JSX.Element {
  return (
   <div className="border p-4 rounded-lg mb-3 -md shadow-md  mb-3">
    <div className="border-b">
      <h1 className="text-2xl font-bold  ">{title}</h1>
    </div>
    <div>
    <p>{children}</p>
    </div>  
   </div>
  );
}

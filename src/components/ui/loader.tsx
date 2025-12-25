import { Spinner } from "@/components/ui/spinner";

function lazyLoader() {
  return (
    <div className="flex flex-row justify-center items-center gap-4 [--radius:1.2rem] h-screen">
      <Spinner />
    </div>
  );
}

export default lazyLoader;

type Props = {
  item: any;
  cancel: (value: any) => void;
  handleDelete: () => void;
  type: string;
};

const DeleteConfirmation = ({ item, cancel, type, handleDelete }: Props) => {
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-10">
      <div className="w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto dark:bg-primary-500 bg-white p-6 rounded-lg">
        {type === "review" && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">Delete Review</h2>
            <p>
              Are you sure you want to delete this review? Please note that this
              action cannot be undone and the review will be permanently
              removed. Please confirm if you wish to proceed with the deletion.
            </p>
            <div className="w-full flex justify-evenly">
              <button
                className="p-3 rounded-lg bg-red-500 text-white"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="p-3 rounded-lg bg-indigo-500 text-white"
                type="button"
                onClick={() => cancel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {type === "product" && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">
              <span className="underline">Delete</span> {item.name}
            </h2>
            <p>
              Are you sure you want to delete this product from your shopping
              cart? Please note that this action cannot be undone and the
              product will be permanently removed. Please confirm if you wish to
              proceed with the deletion.
            </p>
            <div className="w-full flex justify-evenly">
              <button
                className="p-3 rounded-lg bg-red-500 text-white"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="p-3 rounded-lg bg-indigo-500 text-white"
                type="button"
                onClick={() => cancel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {type === "productDashbordDelete" && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">
              <span className="underline">Delete</span> {item.name}
            </h2>
            <p>
              Are you sure you want to delete this product? Please note that
              this action cannot be undone and the product will be permanently
              removed. Please confirm if you wish to proceed with the deletion.
            </p>
            <div className="w-full flex justify-evenly">
              <button
                className="p-3 rounded-lg bg-red-500 text-white"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="p-3 rounded-lg bg-indigo-500 text-white"
                type="button"
                onClick={() => cancel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {type === "productDashbord" && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">
              <span className="underline">Delete</span> {item.name}
            </h2>
            <p>
              Are you sure you want to delete this product? Note that this
              action still has the possibility to be changed later
            </p>
            <div className="w-full flex justify-evenly">
              <button
                className="p-3 rounded-lg bg-red-500 text-white"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="p-3 rounded-lg bg-indigo-500 text-white"
                type="button"
                onClick={() => cancel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {type === "restoreProductDashbord" && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">
              <span className="underline">Restore</span> {item.name}
            </h2>
            <p>
              Are you sure you want to restore this product? Said action will
              put the product online again.
            </p>
            <div className="w-full flex justify-evenly">
              <button
                className="p-3 rounded-lg bg-indigo-500 text-white"
                type="button"
                onClick={handleDelete}
              >
                Restore
              </button>
              <button
                className="p-3 rounded-lg bg-red-500 text-white"
                type="button"
                onClick={() => cancel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmation;

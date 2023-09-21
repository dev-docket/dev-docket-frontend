import { Add } from "@mui/icons-material";

interface Props {
  onClick: () => void;
}

export const NewTeamCard = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex h-[10rem] w-[13rem] flex-col rounded-2xl bg-[#242729] p-4 transition-colors hover:cursor-pointer hover:bg-zinc-950"
    >
      {/* <p>members image</p> */}
      <p className="text-xl">You don't have any team</p>
      <p className="mt-auto flex justify-end text-sm">
        Create now here!
        <Add />
      </p>
    </div>
  );
};

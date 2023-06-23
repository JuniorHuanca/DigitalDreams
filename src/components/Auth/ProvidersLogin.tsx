import { signIn, useSession } from "next-auth/react";
import useInfoProviders from "@/shared/util/providers";
import SvgGoogle from "@/components/Icons/Google";
import Github from "@/components/Icons/Github";
import Spotify from "../Icons/Spotify";
type Props = {};

const ProvidersLogin = (props: Props) => {
  const { providers } = useInfoProviders();
  return (
    <div className="flex flex-row justify-evenly items-center gap-4">
      {providers?.google && (
        <button
          className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
          onClick={async (e) => {
            e.preventDefault();
            await signIn(providers.google.id);
          }}
        >
          <SvgGoogle />
        </button>
      )}
      {providers?.github && (
        <button
          className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
          onClick={async (e) => {
            e.preventDefault();
            await signIn(providers.github.id);
          }}
        >
          <Github />
        </button>
      )}
      {providers?.spotify && (
        <button
          className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
          onClick={async (e) => {
            e.preventDefault();
            await signIn(providers.spotify.id);
          }}
        >
          <Spotify />
        </button>
      )}
    </div>
  );
};

export default ProvidersLogin;

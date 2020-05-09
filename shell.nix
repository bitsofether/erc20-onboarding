with import <nixpkgs> { };

stdenv.mkDerivation {
  name = "ixo-oz-erc20-env";
  buildInputs = [
    nodejs-13_x
    yarn
    git
  ];
  shellHook = ''
   
  '';
}

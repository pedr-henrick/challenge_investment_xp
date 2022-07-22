import { StatusCodes } from "http-status-codes";
import ErrorHandle from "../Class/error";
import { AssetsModel } from "../Models/assets.model";
import { assetType } from "../Types/Asset.type";
import getRandomInt from "../utils/getRandomInt";

const Serialize = (assets: assetType) => {
  const assetsSerialized = {
    codAtivo: assets.asset_code,
    NomeAtivo: assets.name,
    QtdeAtivo: assets.amount_assets,
    Valor: assets.value,
  };
  return assetsSerialized;
}

export class AssetsService {
  async all() {
    const assetsInstance = new AssetsModel();
    const allAssets = await assetsInstance.all();

    const allAssetsSerialized = allAssets
      .map((asset) => Serialize(asset));
    
      return allAssetsSerialized;
  }

  async one(codAtivo: number) {
    const assetsInstance = new AssetsModel();
    const asset = await assetsInstance.one(codAtivo);

    if (!asset) throw new ErrorHandle(StatusCodes.BAD_REQUEST, 'Asset is not exists');
    
    const assetSerialized = Serialize(asset);
    return assetSerialized;
  }

  async autoUpdate() {
    const assetsInstance = new AssetsModel();
    const allAssets = await assetsInstance.all();

    Promise.all<any>(allAssets.map(async (assets) => {
      switch (getRandomInt(1, 3)) {
        case 1:
          assets.value += (assets.value * (getRandomInt(1, 1) / 100));
          await assetsInstance.autoUpdate({
            asset_code: assets.asset_code,
            value: assets.value,
          });
          break;
        case 2:
          assets.value -= (assets.value * (getRandomInt(1, 3) / 100));
          await assetsInstance.autoUpdate({
            asset_code: assets.asset_code,
            value: assets.value,
          });
          break;
        default:
          await assetsInstance.autoUpdate({
            asset_code: assets.asset_code,
            value: assets.value,
          });
      }
    }));
    return 'Atualizado';
  };
}
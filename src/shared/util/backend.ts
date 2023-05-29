export const productDescriptionParser = (description: string) => {
  const splitDesc = description.split("##");
  const result: Array<{ h2?: string; ul?: Array<string>; br?: null }> = [];
  let ulRef: { ul: Array<string> } | undefined;

  for (let i = 1; i < splitDesc.length; i++) {
    const element = splitDesc[i];

    switch (element[0]) {
      case "1":
        ulRef?.ul.push(splitDesc[i].slice(1));
        break;
      case "2":
        result.push({ h2: splitDesc[i].slice(1) });
        break;
      case "3":
        ulRef = { ul: [] };
        result.push(ulRef);
        break;
      case "4":
        result.push({ br: null });
        break;
      default:
        break;
    }
  }

  return result;
};

export const formatDate = (value: string | Date) => {
  const date = new Date(value);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return `${formattedDate} ${formattedTime}`;
};

import React, { useState } from "react";
import { Dialog, Paragraph } from "evergreen-ui";

export const LoadingDialog: React.FC<{ text: string }> = ({ text }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <Dialog
      isShown={isShown}
      title="Loading Pokemon"
      onCloseComplete={() => setIsShown(false)}
      hasCancel={false}
      shouldCloseOnOverlayClick={false}
    >
      <Paragraph>
        This only happens this one time, and then you'll have all your Pokemon
        saved for quick use.
      </Paragraph>
      <Paragraph>{text}</Paragraph>
    </Dialog>
  );
};

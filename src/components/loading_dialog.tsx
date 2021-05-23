import React, { useState } from "react";
import { Spinner, Dialog, Paragraph, Text, Pane } from "evergreen-ui";

export const LoadingDialog: React.FC<{ text: string }> = ({ text }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <Dialog
      isShown={isShown}
      title="Loading Pokemon"
      onCloseComplete={() => setIsShown(false)}
      hasCancel={false}
      hasFooter={false}
      shouldCloseOnOverlayClick={false}
    >
      <Paragraph>
        This only happens this one time, and then you'll have all your Pokemon
        saved for quick use.
      </Paragraph>

      <Pane
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size={16} marginRight={8} />
        <Text>{text}</Text>
      </Pane>
    </Dialog>
  );
};

export default function FormTextArea(props: any) {

  const { 
    validation,
     invalid = "false",
      dirty="false", 
      onTurnDirty, 
      ...textAreaProps } = props;

  function handleBlur () {
    onTurnDirty(props.name);
  }

  return <textarea
     {...textAreaProps}
      data-invalid={invalid}
      onBlur={handleBlur}
      data-dirty={dirty}
      />
      
}

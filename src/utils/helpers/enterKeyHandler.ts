function handleEnterKeyPress(e: any): void {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}

export { handleEnterKeyPress };

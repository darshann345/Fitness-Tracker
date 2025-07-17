import styles from './UpdateDataForm.module.css';
import Button from '../../Button/Button.jsx';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

export default function UpdateDataForm({
  setIsOpen,
  healthStatsList = [],
  sethealthStatsList,
  editId,
  setBalance,
  balance
}) {
  const [formData, setFormData] = useState({
    date: '',
    calorie_intake: '',
    calorie_burned: '',
    short_description: '',
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (balance < Number(formData.calorie_burned)) {
      enqueueSnackbar("Calories burned should be less than your balance", { variant: "warning" });
      setIsOpen(false);
      return;
    }

    setBalance((prev) => prev - Number(formData.calorie_burned));

    const lastId = Array.isArray(healthStatsList) && healthStatsList.length > 0
      ? healthStatsList[0].id
      : 0;

    sethealthStatsList((prev) => [{ ...formData, id: lastId + 1 }, ...prev]);

    setFormData({
      date: '',
      calorie_intake: '',
      calorie_burned: '',
      short_description: '',
    });

    setIsOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const updated = healthStatsList.map((item) => {
      if (item.id === editId) {
        const diff = item.calorie_burned - Number(formData.calorie_burned);

        if (diff < 0 && Math.abs(diff) > balance) {
          enqueueSnackbar("Calories burned should not exceed your balance", { variant: "warning" });
          setIsOpen(false);
          return item;
        }

        setBalance((prev) => prev + diff);
        return { ...formData, id: editId };
      } else {
        return item;
      }
    });

    sethealthStatsList(updated);
    setIsOpen(false);
  };

  useEffect(() => {
    if (editId && Array.isArray(healthStatsList)) {
      const expenseData = healthStatsList.find((item) => item.id === editId);
      if (expenseData) {
        setFormData({
          date: expenseData.date || '',
          calorie_intake: expenseData.calorie_intake || '',
          calorie_burned: expenseData.calorie_burned || '',
          short_description: expenseData.short_description || '',
        });
      }
    }
  }, [editId, healthStatsList]);

  return (
    <div className={styles.formWrapper}>
      <h3>{editId ? "Let's see what you want to change!" : "How Much Net Calorie did you take Today?"}</h3>
      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="calorie_intake"
          placeholder="Enter Today's Calorie Intake"
          value={formData.calorie_intake}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="calorie_burned"
          placeholder="Enter Today's Calorie Burned"
          value={formData.calorie_burned}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="short_description"
          placeholder="Enter a short description"
          value={formData.short_description}
          onChange={handleChange}
          required
        />

        <Button type="submit" style="blue" shadow>Submit</Button>
        <Button style="failure" shadow handleClick={() => setIsOpen(false)}>Cancel</Button>
      </form>
    </div>
  );
}

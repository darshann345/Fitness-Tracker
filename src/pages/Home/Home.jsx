import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import TransactionList from "../../components/TransactionList/TransactionList";
import UpdateDataForm from "../../components/Forms/UpdateDataForm/UpdateDataForm";
import Modal from "../../components/Modal/Modal";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [healthStatsList, sethealthStatsList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpenHealthStats, setisOpenHealthStats] = useState(false);

  const expense = healthStatsList.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.price || 0),
    0
  );

  let calorieIntakeTotal = 0;
  let calorieBurnedTotal = 0;
  let calorieIntakeCount = 0;
  let calorieBurnedCount = 0;

  healthStatsList.forEach((item) => {
    if (item.calorie_intake) {
      calorieIntakeTotal += Number(item.calorie_intake);
      calorieIntakeCount++;
    }
    if (item.calorie_burned) {
      calorieBurnedTotal += Number(item.calorie_burned);
      calorieBurnedCount++;
    }
  });

  const calorieTaken = {
    intake: calorieIntakeTotal,
    burned: calorieBurnedTotal,
  };

  const calorieTakenCount = {
    intake: calorieIntakeCount,
    burned: calorieBurnedCount,
  };

  // Group data by date for BarChart
  const barChartDataMap = {};

  healthStatsList.forEach((entry) => {
    const date = entry.date;

    if (!barChartDataMap[date]) {
      barChartDataMap[date] = {
        date,
        calorieIntake: 0,
        calorieBurned: 0,
      };
    }

    barChartDataMap[date].calorieIntake += Number(entry.calorie_intake || 0);
    barChartDataMap[date].calorieBurned += Number(entry.calorie_burned || 0);
  });

  const barChartData = Object.values(barChartDataMap);

  // Load from localStorage on mount
  useEffect(() => {
    const localBalance = localStorage.getItem("balance");

    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));
    sethealthStatsList(items || []);
    setIsMounted(true);
  }, []);

  // Save health stats to localStorage
  useEffect(() => {
    if (healthStatsList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(healthStatsList));
    }
  }, [healthStatsList]);

  // Save balance to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div className={styles.container}>
      <h1>Health Tracker</h1>

      <div className={styles.cardsWrapper}>
        <Card
          title="Update Today's Data"
          buttonText="+ Add Data"
          buttonType="success"
          success={false}
          handleClick={() => {
            setisOpenHealthStats(true);
          }}
        />
        <BarChart data={barChartData} />
      </div>

      <div className={styles.transactionsWrapper}>
        <TransactionList
          transactions={healthStatsList}
          editTransactions={sethealthStatsList}
          title="Recent Health Statistics"
          balance={balance}
          setBalance={setBalance}
        />

        <PieChart
          data={[
            { name: "Intake", value: calorieTaken.intake },
            { name: "Burned", value: calorieTaken.burned },
          ]}
          title="Over All Data"
        />
      </div>

      <Modal isOpen={isOpenHealthStats} setIsOpen={setisOpenHealthStats}>
        <UpdateDataForm
          setIsOpen={setisOpenHealthStats}
          healthStatsList={healthStatsList}
          sethealthStatsList={sethealthStatsList}
          setBalance={setBalance}
          balance={balance}
          editId={null}
        />
      </Modal>
    </div>
  );
}
